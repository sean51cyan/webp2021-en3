import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
        <header className="hero is-dark is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">いろいろな犬</h1>
                </div>
            </div>
        </header>
    );
}

function Image(props) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
                    <img src={props.src} alt="cute dog!" />
                </figure>
            </div>
        </div>
    );
}

function Loading() {
    return <p>Loading...</p>;
}

function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
        return <Loading />;
    }
    return (
        <div className="columns is-vcentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-3">
                        <Image src={url} />
                    </div>
                );
            })}
        </div>
    );
}

function ExplainDog() {
    return (
        <div>
            <p>ここでは犬の画像に加えその犬に対しての説明をする。</p>
        </div>
    )
}

function DogText(props) {
    if (props.breed == "shiba") {
        return (
            <div>
                <p><strong>柴犬</strong></p>
                <p>柴犬は日本犬の中で唯一の小型犬である。</p>
                <p>国内で飼育されている日本犬の約8割が柴犬。</p>
                <p>外国での人気も高く「Shiba Inu」という名称で呼ばれている。</p>
            </div>
        )
    } else if (props.breed == "akita") {
        return (
            <div>
                <p><strong>秋田犬</strong></p>
                <p>秋田犬は日本犬の名で唯一の大型犬である。</p>
                <p>秋田県が原産の犬。</p>
                <p>飼い主に忠実で番犬適性あり。</p>
                <p>忠犬ハチ公が有名。</p>
            </div>
        )
    } else if (props.breed == "poodle") {
        return (
            <div>
                <p><strong>プードル</strong></p>
                <p>ドイツが原産であり、ヨーロッパに広くいる。</p>
                <p>語源がドイツ語の水に関係する言葉。</p>
                <p>大きさによって トイ、ミニチュア、ミディアム、スタンダートに分類される.</p>
                <p>犬の中でとてもも賢い犬種。</p>
                <p>泳ぎが得意なのでカモ猟を手伝っていた。</p>
            </div>
        )
    } else if (props.breed == "husky") {
        return (
            <div>
                <p><strong>ハスキー</strong></p>
                <p>ロシアが原産であり、シベリアン・ハスキーとして知られている。</p>
                <p>名前にもある通りシベリアなどの北極圏の寒い地域に生息している。</p>
                <p>エスキモーと称される部族での犬ぞりの牽引を行う犬。</p>
                <p>日本ではバブルの時にハスキー犬ブームが起きた。</p>
            </div>
        )
    } else {
        return <p>誰もいないなねさみしいね。</p>
    }
}

function Form(props) {
    function handleSubmit(event) {
        event.preventDefault();
        const { breed } = event.target.elements;
        props.onFormSubmit(breed.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <div className="select is-fullwidth">
                            <select name="breed" defaultValue="shiba">
                                <option value="shiba">shiba</option>
                                <option value="akita">akita</option>
                                <option value="poodle">poodle</option>
                                <option value="husky">husky</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-dark">
                            Reload
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

function Main() {
    const [urls, setUrls] = useState(null);
    const [breed, setBreed] = useState("shiba");
    useEffect(() => {
        fetchImages("shiba").then((urls) => {
            setUrls(urls);
        });
    }, []);
    function reloadImages(breed) {
        fetchImages(breed).then((urls) => {
            setUrls(urls);
        });
        setBreed(breed);
    }
    return (
        <main>
            <section className="section">
                <div className="container">
                    <ExplainDog />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={reloadImages} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <DogText breed={breed} />
                </div>
            </section>
        </main>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>わんわんかわいいね</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">Donate to Dog API</a>
                </p>
                <p>5420057 山田裕斗</p>
                <p>WEBプログラミング演習課題３</p>
            </div>
        </footer>
    );
}

function App() {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;