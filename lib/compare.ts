import { verses } from "@prisma/client";

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
        else if(a.done && !b.done || b.value.position < a.value.position )
        {
            ao.push({id: -1, verse: "", songId: bid, position: b.value.position});
            bo.push(b.value);
            b = bi.next();
        }
        // B is done, or behind a
        else if (!a.done && b.done || b.value.position > a.value.position)
        {
            ao.push(a.value)
            bo.push({id: -1, verse: "", songId: aid, position: b.value.position});
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
    return [a, b];
}
