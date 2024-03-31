import { ToyPreview } from "./ToyPreview.jsx";


export function ToyList({toys,onRemoveToy,user}){
return (
    <ul className="toy-list">
        {toys.map(toy =>
            <li className="toy-preview" key={toy._id}>
                <ToyPreview
                onRemoveToy={onRemoveToy}
                 toy={toy}
                 user={user} />

                {/* <div>
                    <button onClick={() => onRemoveToy(toy._id)}>x</button>
                    <button onClick={() => onEditToy(toy)}>Edit</button>
                </div> */}

            </li>)}
    </ul>
)
}