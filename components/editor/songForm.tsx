import  {Form, Field} from 'react-final-form'
import {verses, songs} from "@prisma/client";
import { FormApi } from 'final-form';
import {ChessInput, ChessButton} from "components/formElements";

// (alias) type songs = {
//     id: number;
//     trackName: string | null;
//     copySongId: number | null;
// }

interface Props
{
    onSubmit: (songs: any, form: FormApi<any, songs>) => void;
    initialValues?: songs
    shows: {
        id: number
        shortName: string,
    }[],
    baseSongs: {
        id: number,
        title: string
    }[]
}

interface ValidationResult {
    title?: string,
    showOrder?: string
}

const VerseForm = ({onSubmit, initialValues, shows, baseSongs} : Props) => (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={values => {
            const errors: ValidationResult = {};
            if(!values.showOrder) errors.showOrder = "Required";
            if(!values.title) errors.title = "Required"
            return errors;
        }}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="my-4">
                <div className="flex flex-row mb-4">
                    <Field name="title">
                        {({input, meta}) => (
                            <div className="flex flex-col flex-none">
                                <div>
                                    <label className="text-lg font-bold">Title:</label>
                                    <ChessInput {...input} className="w-96 ml-2" placeholder="" />
                                </div>
                                {meta.error && meta.touched && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="showOrder">
                        {({input, meta}) => (
                            <div className="mx-3 flex flex-col flex-none">
                                <div>
                                    <label className="text-lg font-bold">Show Order:</label>
                                    <ChessInput {...input} className="w-20 ml-2" placeholder="0" />
                                </div>
                                {meta.error && meta.touched && <div>{meta.error}</div>}
                            </div>
                        )}
                    </Field>
                    <Field name="act">
                        {({input}) => (
                            <div>
                                <label className="text-lg font-bold">Act:</label>
                                <ChessInput {...input} className="w-20 ml-2" placeholder="1" />
                            </div>
                        )}
                    </Field>
                </div>

                <div className="flex flex-row mb-4">
                    <Field name="showId" component="select">
                        {shows.map(s => <option value={s.id} key={s.id}>{s.shortName}</option>)}
                    </Field>
                    <Field name="baseSongId" component="select">
                        <option />
                        {baseSongs.map(s => <option value={s.id} key={s.id}>{s.title}</option>)}
                    </Field>
                </div>

                <div className="flex flex-row mb-4">
                    <Field name="trackName">
                        {({input}) => (
                            <div className="mr-3">
                                <label className="text-lg font-bold">Track Name:</label>
                                <ChessInput {...input} className="w-96 ml-2" />
                            </div>
                        )}
                    </Field>
                    <Field name="copySongId">
                        {({input}) => (
                            <div>
                                <label className="text-lg font-bold">Copy Song:</label>
                                <ChessInput {...input} className="w-20 ml-2" placeholder="1" />
                            </div>
                        )}
                    </Field>
                </div>

                <ChessButton type="submit">Submit</ChessButton>
            </form>
        )}
    />
)

export default VerseForm;