import  {Form, Field} from 'react-final-form'
import {verses, Prisma, songs} from "@prisma/client";

interface Props
{
    onSubmit: (verse: any) => void;
    initialValues?: verses
    songs?: {
        id: number
        title: string
    }[],
    initialSong?: songs,
}

const VerseForm = ({onSubmit, initialValues} : Props) => (
    <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        render={({handleSubmit}) => (
            <form onSubmit={handleSubmit} className="my-4">
                <div className="flex flex-row mb-4">
                    <Field name="songId">
                        {({input}) => (
                            <div>
                                <label className="text-lg font-bold">Song ID:</label>
                                <input className="border-2 rounded-md px-2 text-md text-grey-darkest ml-2 focus:ring w-20" {...input} placeholder="0" />
                            </div>
                        )}
                    </Field>
                    <Field name="position">
                        {({input}) => (
                            <div className="mx-3">
                                <label className="text-lg font-bold">Position:</label>
                                <input className="border-2 rounded-md px-2 text-md text-grey-darkest ml-2 focus:ring w-20" {...input} placeholder="0" />
                            </div>
                        )}
                    </Field>
                </div>
                <Field name="verse">
                    {({input}) => (
                        <div className="mb-4">
                            <label className="text-lg font-bold">Lyrics:</label>
                            <textarea {...input} className="w-full border-2 rounded-md p-2 focus:ring" rows={20}/>
                        </div>
                    )}
                </Field>

                <button type="submit" className="font-bold border-2 p-2 bg-gray-300">Submit</button>
            </form>
        )}
    />
)

export default VerseForm;