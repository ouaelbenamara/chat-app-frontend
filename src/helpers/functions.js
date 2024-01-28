export const convertFileToBase64 = (e,setSelectedImage) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=()=>{
            console.log(reader.result)
            setSelectedImage( reader.result)
        }
        reader.onerror=(error)=>{
            console.log(error)
        }

};