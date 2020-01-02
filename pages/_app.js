import React from "react";
import App from "next/app";
import Head from "next/head";
import "react-quill/dist/quill.snow.css";
import "../public/main.css";
import "../public/preflight.css";
import "../public/editor.css";
import "../public/home.css";

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <div>
                <Head>
                    <title>His Secret Obsession</title>
                    <link
                        href="https://fonts.googleapis.com/css?family=Lora:400,700|Roboto:300,400,500&display=swap"
                        rel="stylesheet"
                    />
                    <meta
                        name="description"
                        content="Why Men Leave Perfect Women - you can literally check off every box on his “perfect woman” list... But if you mess up this one thing, he’ll drop you the second another option comes along? My friend James Bauer discovered this missing “secret ingredient” all men are constantly searching for in a woman."
                    />

                    <meta
                        name="viewport"
                        content="initial-scale=1.0, width=device-width"
                    />
                </Head>
                <Component {...pageProps} />
            </div>
        );
    }
}

export default MyApp;
