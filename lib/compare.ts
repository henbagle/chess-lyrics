import { verses } from "@prisma/client";
import {diff_match_patch} from "lib/diff-match-patch/diff_match_patch_uncompressed";

export function mergeAndCompareSongs(inputA: verses[], inputB: verses[]) 
{
    const ao: verses[] = [];
    const bo: verses[] = [];
    const ai = inputA[Symbol.iterator]();
    const bi = inputB[Symbol.iterator]();

    let a = ai.next()
    let b = bi.next();

    const aid = a.value.songId;
    const bid = b.value.songId;

    while(true)
    {
        if(a.done && b.done)
        {
            break;
        }
        // A is done, or is behind b
        else if(a.done && !b.done || b.value?.position < a.value?.position )
        {
            ao.push({id: -1, verse: "", songId: bid, position: b.value.position});
            bo.push(b.value);
            b = bi.next();
        }
        // B is done, or behind a
        else if (!a.done && b.done || b.value?.position > a.value?.position)
        {
            ao.push(a.value)
            bo.push({id: -1, verse: "", songId: aid, position: a.value.position});
            a = ai.next();
        }
        // At the same value
        else {
            const [aCompared, bCompared] = diffVerses(a.value, b.value)
            ao.push(aCompared);
            bo.push(bCompared);
            a = ai.next();
            b = bi.next();
        }
    }

    return [ao, bo];
}

function diffVerses(a: verses, b: verses)
{
    if(a.verse === "" || b.verse === "")
    {
        return [a, b];
    }

    const delToken='@d'
    const addToken='@a'

    const dmp = new diff_match_patch();
    let difference = dmp.diff_main(a.verse, b.verse);
    dmp.diff_cleanupSemantic(difference);
    [a.verse, b.verse] = difference.reduce((acc, d) => {
        const val = d[1];
        switch(d[0]){
            case -1:
                return [acc[0] + delToken + val + delToken, acc[1]];
            case 0:
                return [acc[0] + val, acc[1] + val];
            case 1:
                return [acc[0], acc[1] + addToken + val + addToken];
        }
    }, ["", ""])

    return [a, b];
}
