import  {Form, Field, FormSpy} from 'react-final-form'
import {verses, Prisma, songs} from "@prisma/client";
import { FormApi } from 'final-form';
import {ChessInput, ChessButton} from "components/formElements";

interface Props
{
    onSubmit: (verse: any, form: FormApi<any, verses>) => void;
    initialValues?: verses
    songs?: {
        id: number
        title: string,
        showId: number
    }[],
    initialSong?: songs,
}

interface ValidationResult {
    songId?: string,
    position?: string,
    verse?: string
}

const VerseForm = ({onSubmit, initialValues, songs} : Props) => (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={values => {
            const errors: ValidationResult = {};
            const songIds = songs.map(s => s.id);

            if(!songIds.includes(parseInt(values.songId))) errors.songId="No corresponding song"
            if(isNaN(parseInt(values.songId))) errors.songId = "Must be an integer"
            if(!values.songId) errors.songId = "Required";

            if(isNaN(parseInt(values.position))) errors.position = "Must be an integer"
            if(!values.position) errors.position = "Required";

            if(!values.verse) errors.verse = "Required"

            return errors;
        }}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="my-4">
                <div className="flex flex-row mb-4">
                    <Field name="songId">
                        {({input, meta}) => (
                            <div className="flex flex-col flex-none">
                                <div>
                                    <label className="text-lg font-bold">Song ID:</label>
                                    <ChessInput {...input} className="w-20 ml-2" placeholder="0" />
                                </div>
                                {meta.error && meta.touched && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="position">
                        {({input, meta}) => (
                            <div className="mx-3 flex flex-col">
                                <div>
                                    <label className="text-lg font-bold">Position:</label>
                                    <ChessInput {...input} className="w-20 ml-2" placeholder="0" />
                                </div>
                                {meta.error && meta.touched && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <FormSpy subscription={{values: true}}>
                        {({values}) => {
                            return <div>{songs.filter((el) => (el.id==parseInt(values["songId"]))).map((el) => `${el.title} - Show #${el.showId}`)[0]}</div>
                        }}
                    </FormSpy>
                </div>
                <Field name="verse">
                    {({input, meta}) => (
                        <div className="mb-4">
                            <label className="text-lg font-bold">Lyrics:</label>
                            <textarea {...input} className="w-full border-2 rounded-md p-2 focus:ring" rows={20}/>
                            {meta.error && meta.touched && <div>{meta.error}</div>}
                        </div>
                    )}
                </Field>

                <ChessButton type="submit">Submit</ChessButton>
            </form>
        )}
    />
)

export default VerseForm;