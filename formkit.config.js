import { generateClasses } from '@formkit/themes'

const config = {
    config: {
        classes: generateClasses({
            global: {
                label: 'block mb-1 font-bold text-lg uppercase',
                message: 'text-red-500 mb-5',
                wrapper: 'mb-3',
                input: 'w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400',
            },
            text: {

            },
            number: {

            },
            select: {


            },
            file: {

                noFiles: 'block my-2',
                fileItem: 'hidden',
            },
            submit: {
                input: '$reset bg-green-400 hover:bg-green-700 hover:text-white w-full p-2 rounded transition font-bold uppercase disabled:opacity-50'
            }
        })
    }
}
export default config