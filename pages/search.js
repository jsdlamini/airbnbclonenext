import { useRouter } from "next/dist/client/router"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { format } from "date-fns"
import InfoCard from "../components/InfoCard"

const Search = ({ searchResults }) => {
    const router = useRouter()

    const { startDate, endDate, location, noOfGuests } = router.query
    const formattedStartDate = format(new Date(startDate), "dd MMMM yy")
    const formattedEndDate = format(new Date(endDate), "dd MMMM yy")

    const range = `${formattedStartDate} - ${formattedEndDate}`




    return (
        <div>
            <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
            <main className="flex">
                <section className="flex-grow pt-14 px-6">
                    <p className="  font-bold border-b py-2">300+ Stays - {range} - for {noOfGuests} number of guests</p>
                    <h1 className="text-3xl font-semibold mt-2 mb-6"> Stays in {location}</h1>
                    <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                        <p className="button font-bold"> Cancellation Flexibility  </p>
                        <p className="button  font-bold"> Type of Place </p>
                        <p className="button  font-bold"> Price  </p>
                        <p className="button  font-bold"> Rooms and Beds </p>
                        <p className="button  font-bold"> More Filters  </p>
                    </div>

                    <div className="flex flex-col">

                        {searchResults.map((
                            { img, location, title, description, star, price, total }) => (
                            <InfoCard
                                key={img}
                                img={img}
                                location={location}
                                title={title}
                                description={description}
                                start={star}
                                price={price}
                                total={total}
                            />
                        )
                        )

                        }



                    </div>
                </section>
            </main>


            <Footer />
        </div>
    )
}

export default Search

export async function getServerSideProps() {
    const searchResults = await fetch('https://links.papareact.com/isz')
        .then(res => res.json())

    return {
        props: {
            searchResults,
        }
    }



}

