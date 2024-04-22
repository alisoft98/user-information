import { OpenAI } from "@langchain/openai";
import { PuppeteerWebBaseLoader } from "langchain/document_loaders/web/puppeteer";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

async function web_base_summarize(url: string) {
    try {
        const llm = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0,
            modelName: "gpt-3.5-turbo-16k",
        });
        // using Puppeteer to collect url content .
        const loader = new PuppeteerWebBaseLoader(url)
        // define text spliter
        const textSplitter = new TokenTextSplitter({ chunkSize: 10000 });
        // load the documents
        const docs = await loader.load()
        // splite loaded documents
        const spilited_docs = await textSplitter.createDocuments([docs[0].pageContent])
        // define load summarize chain
        const chain = loadSummarizationChain(llm, { type: 'stuff' })
        // run the chain and get the result
        const result = await chain.invoke({ input_documents: spilited_docs })
        return result.text
    } catch (error) {
        console.log(error)
    }
}
