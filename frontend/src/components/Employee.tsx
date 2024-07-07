import ImageComponent from "src/components/ui/ImageComponent"
import { EmployeeType } from "src/utils/types"


type EmployeePropsType = {
    employee: EmployeeType,
}

const Employee = ({ employee }: EmployeePropsType) => {
    return (
        <div className="col col-lg-3 col-md-6 col-sm-12 team-col">
            <a
                className="image-container"
                href={employee.imglink}
                target="_blank"
                title={employee.imgtitle}
            >
                <ImageComponent
                    className="module image portrait"
                    src={employee.img}
                    alt={employee.firstname + " " + employee.lastname}
                    loading="lazy"
                    width="100%"
                />
            </a>
            <div className="module text name-headline">
                <h3 className="headline">
                    {employee.firstname} {employee.lastname}
                </h3>
            </div>
            <div className="module text desc-list">
                <ul>
                    {employee.description.map((desc, idx) =>
                        <li key={idx}>
                            {desc}
                        </li>
                    )}
                </ul>
            </div>
            <div className="module text quote">
                <p className="custom1">
                    {"\"" + employee.quote + "\""}
                </p>
            </div>
        </div>
    )
}

export default Employee