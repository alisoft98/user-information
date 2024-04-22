from langchain.chains.summarize import load_summarize_chain
from langchain_community.document_loaders import WebBaseLoader
from langchain_anthropic import ChatAnthropic
from dotenv import load_dotenv
import os


# Load environment variables from the .env file
load_dotenv()

## General
def web_base_summarize_anthropic(url: str):
    try:
        # Create LLM with Anthropic
        llm = ChatAnthropic(
        temperature=0,
        model_name="claude-3-opus-20240229",
        anthropic_api_key=os.environ.get("ANTHROPIC_API_KEY"),
        )
        # Load website content
        # Use verify_ssl=False To bypass SSL verification errors during fetching
        loader = WebBaseLoader(url , verify_ssl=False)
        docs = loader.load()

        # Use "load_summarize_chain" with chain_type="stuff" as LLM
        chain = load_summarize_chain(llm, chain_type="stuff")

        # pass loaded documents to the LLM
        result = chain.run(docs)

        # Token useage for Anthropic is not available yet
        return {
            "data": {
            "result": result,
            "token_data": {
                "total_tokens": 0,
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_cost": 0,
                "successful_requests": 0,
                },
            },
            "code": 200,
        }
    except:
        return {
            "error":  "Input Url is not valid !!!",
            "code": 400
        }

