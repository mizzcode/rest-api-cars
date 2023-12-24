/* eslint-disable @typescript-eslint/explicit-function-return-type */
export class App {
    constructor() {
        // get element form search car
        this.formSearchCar = document.getElementById('searchCar')
        this.resultCar = document.getElementById('resultCar')
    }

    init() {
        const typeDriver = document.getElementById('driver')
        const date = document.getElementById('date')
        const pickupTime = document.getElementById('pickupTime')
        const totalPassenger = document.getElementById('totalPassenger')
        const submitButton = document.getElementById('cariMobil')

        typeDriver.addEventListener('change', enableSubmitButton)
        date.addEventListener('input', enableSubmitButton)
        pickupTime.addEventListener('change', enableSubmitButton)
        totalPassenger.addEventListener('input', enableSubmitButton)

        function enableSubmitButton() {
            if (
                typeDriver.value !== 'Pilih Tipe Driver' &&
                date.value !== '' &&
                pickupTime.value !== 'Pilih Waktu' &&
                totalPassenger.value !== ''
            ) {
                submitButton.removeAttribute('disabled')
            } else {
                submitButton.setAttribute('disabled', true)
            }
        }
    }
}

const app = new App()
app.init()
