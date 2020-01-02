import { useEffect, useState } from "react";
import { getPage } from "./../firebase";
import Link from "next/link";
import ReactSVG from "react-svg";
import Newsletter from "./Newsletter";
import QuillForm from "./QuillForm";
import TextAreaForm from "./TextAreaForm";
import InputForm from "./InputForm";

export default () => {
    const [page, setPage] = useState({ loading: true });
    const product = "hissecretobsession";
    useEffect(() => {
        async function loadPage() {
            await getPage(product).then(res => {
                const pageItems = {};
                res.forEach(item => {
                    const key = Object.keys(item)[0];
                    const value = Object.values(item)[0];
                    pageItems[key] = value;
                });
                setPage({ ...pageItems, loading: false });
            });
        }

        loadPage();
    }, [getPage]);

    if (page.loading) {
        return (
            <div>
                <h1 className="text-gold">Loading</h1>
            </div>
        );
    }

    const getProps = id => {
        return {
            id,
            page: product,
            value: Object.entries(page).find(i => i[0] === id)[1].value,
        };
    };

    return (
        <div>
            <nav className="nav">
                <Link href="/">
                    <div
                        className="nav-logo"
                        style={{ backgroundImage: `url('/static/03.png')` }}
                    />
                </Link>
            </nav>
            <div className="sep"></div>
            <header className="text-center container-fluid p-1">
                <h1 className="font-lora">
                    <TextAreaForm {...getProps("001")} />
                </h1>
            </header>

            <div className="body">
                <main>
                    <div className="container-fluid">
                        <QuillForm {...getProps("art001")} />
                    </div>
                    <section className="container">
                        <QuillForm {...getProps("art002")} />
                    </section>
                </main>

                <footer className="container-fluid text-center">
                    <Newsletter />
                </footer>
            </div>
        </div>
    );
};
