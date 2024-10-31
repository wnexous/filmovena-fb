export default function objDiferentiator(matriz: object, diference: object) {
    const matrizKeys = Object.keys(matriz)

    const objResult = {}

    matrizKeys.forEach(key => {
        try {
            const matrizData = matriz[key as keyof object]
            const diferenceData = diference[key as keyof object]

            if (matrizData != diferenceData) objResult[key as keyof object] = diferenceData
        } catch (err) { 
            console.log('err', err)

        }
    })
    return objResult
};
