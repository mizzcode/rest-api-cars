import { Request, Response } from 'express'
import { CarService } from '../../services/CarService'

interface IReqQuery {
    driver: number
    date: string
    pickupTime: string
    totalPassenger: number
}

export class MainController {
    carService: CarService

    constructor() {
        this.carService = new CarService()
    }

    index(_: Request, res: Response) {
        return res.render('index')
    }

    searchCars = async (req: Request<{}, {}, {}, IReqQuery>, res: Response) => {
        const { driver, date, pickupTime, totalPassenger } = req.query

        let availableCars = await this.carService.getCarAll()

        if (date && pickupTime) {
            const rentalDate = new Date(date + pickupTime)

            availableCars = await this.carService.getCarByAvailableAt(rentalDate)
        }

        // mencari mobil dengan kapasitas terbesar
        const maxCarCapacity = Math.max(...availableCars.map((car: any) => car.capacity))
        // format rupiah
        const rupiah = this.carService.rupiah

        let foundCar = true

        return res.render('cars', { availableCars, driver, totalPassenger, maxCarCapacity, foundCar, rupiah })
    }
}
