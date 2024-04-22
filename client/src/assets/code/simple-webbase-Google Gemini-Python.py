from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.document_loaders import WebBaseLoader
from langchain.chains.summarize import load_summarize_chain
from langchain_community.callbacks import get_openai_callback
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

def web_base_summarize(url: str):
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=os.environ.get("GEMINI_API_KEY")
        )
        # Load website content
        # Use verify_ssl=False To bypass SSL verification errors during fetching
        loader = WebBaseLoader(url, verify_ssl=False)
        docs = loader.load()

        # Use "load_summarize_chain" with chain_type="stuff" as LLM
        chain = load_summarize_chain(llm, chain_type="stuff")

        # Use get_openai_callback() to get token useage result
        with get_openai_callback() as cb:
            # pass loaded documents to the LLM
            result = chain.run(docs)
        return {
            "data": {
                "result": result,
                "token_data": {
                    "total_tokens": cb.total_tokens,
                    "prompt_tokens": cb.prompt_tokens,
                    "completion_tokens": cb.completion_tokens,
                    "total_cost": cb.total_cost,
                    "successful_requests": cb.successful_requests,
                },
            },
            "code": 200,
        }
    except:
        return {"error": "Input Url is not valid !!!", "code": 400}
