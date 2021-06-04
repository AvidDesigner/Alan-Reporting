import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers'

import Alan from './images/Alan-Reporting.jpg'
import NewsCards from './components/NewsCards/NewsCards'

const alanKey = '9672a799c44e2f97d9c2b21231cdccde2e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines') {
                    setNewsArticles(articles)
                } else if(command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if(command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1]

                    if(parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if(article) {
                        window.open(article.url, '_blank')
                        alanBtn().playText('Opening article.')
                    }
                }
            }
        })
    }, [])

    return (
        <div>
            <div className="logo-container">
                <img src={Alan}/>
                <h1>Alan. Reporting Live!</h1>
                <p>Click on the Voice Button to start interacting with Alan</p>
                <p>(Don't forget to click again when you are done)</p>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;