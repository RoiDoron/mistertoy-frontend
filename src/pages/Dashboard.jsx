import { useState } from "react";
import { PriceLabelChart } from "../cmp/PriceLableChart";
import { toyService } from "../services/toy.service";



export function Dashboard() {
    const [data, setData] = useState(null)


    if (!data) return <div>loading...</div>
    return (
        <section className="dashboard-container ">
            <h1>Statistics</h1>
            <main className="flex justify-between">
                <div className="price chart">
                    <PriceLabelChart />
                </div>
                <div className="price chart">
                    {/* <PriceLabelChart/> */}
                </div>
            </main>
        </section>
    )
}