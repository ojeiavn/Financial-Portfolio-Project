
export function Products({ products }) {
    
    return (
        <div id="products">
            <Card />
        </div>
    )
}

function Card({ companies }) {
    return (
        <div class="card">
            {companies.map(company => (
                <CompanyName name={company}/>
            ))}
        </div>
    )
}


function CompanyName(company) {
    return (
        <div class="company-name">
            {company}
        </div>
    )
}

