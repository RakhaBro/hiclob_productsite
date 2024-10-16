import { useEffect } from 'react';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/nav/nav';
import './releases.css';
import ReleaseItem from '../../components/releaseItem/ReleaseItem';

function ReleasesPage() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);

    return (
        <div id="releases">
            <Nav />

            <div id="header">
                <div className="nav_solid_layouter"></div>
                <div>
                    <div className="upper">
                        <h1 className='gradient_text_1'>Releases</h1>
                        <p className="gradient_text_2">All list of Hiclob versions ever released</p>
                    </div>

                    <div id="release_table_container">

                        <ReleaseItem
                            releaseName={"Hiclob Beta 0.5"}
                            isNew={true}
                            isStable={false}
                            releaseYear={2024}
                            releaseDate={"October 10th"}
                            downloads={1260}
                        />

                        <ReleaseItem
                            releaseName={"Hiclob Beta 0.41"}
                            isNew={false}
                            isStable={false}
                            releaseYear={2024}
                            releaseDate={"September 26th"}
                            downloads={231}
                        />

                        <ReleaseItem
                            releaseName={"Hiclob Beta 0.4"}
                            isNew={false}
                            isStable={false}
                            releaseYear={2024}
                            releaseDate={"August 3rd"}
                            downloads={472}
                        />

                        <ReleaseItem
                            releaseName={"Hiclob Beta 0.32"}
                            isNew={false}
                            isStable={false}
                            releaseYear={2024}
                            releaseDate={"July 22nd"}
                            downloads={19}
                        />

                    </div>

                </div>

            </div>

            <Footer />
        </div>
    );
}

export default ReleasesPage;