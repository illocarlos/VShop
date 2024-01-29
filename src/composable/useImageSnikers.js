import { ref, computed } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { uid } from 'uid'

export default function useImage() {
    const url = ref([])
    const storage = useFirebaseStorage()

    const onFileChange = e => {
        const files = e.target.files

        // Subir cada archivo individualmente
        Array.from(files).forEach(file => {

            const sRef = storageRef(storage, `/snikers/${uid()}.jpg`)
            const uploadTask = uploadBytesResumable(sRef, file)

            uploadTask.on('state_changed',
                () => { },
                (error) => { console.log(error) },
                () => {
                    //si llega a este callback  es que la imagen ya se subio
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            url.value.push(downloadURL)


                        })
                }
            )
        })
    }
    const isImageUploader = computed(() => {
        return url.value.length > 0 ? url.value : null
    })
    return {
        url,
        onFileChange,
        isImageUploader
    }
}
