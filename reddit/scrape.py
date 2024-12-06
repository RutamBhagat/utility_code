import praw
import pyperclip
import sys
from datetime import datetime
import os
from dotenv import load_dotenv


def scrape_reddit_post(url):
    """
    Scrapes a Reddit post and its comments, copying the formatted output to clipboard.

    Args:
        url (str): Full Reddit post URL
    """
    # Load environment variables
    load_dotenv()

    # Initialize Reddit instance
    reddit = praw.Reddit(
        client_id=os.getenv("REDDIT_CLIENT_ID"),
        client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
        user_agent="PostScraper 1.0 by YourUsername",
    )

    try:
        # Get submission
        submission = reddit.submission(url=url)

        # Format post content
        output = []
        output.append(f"# {submission.title}\n")
        output.append(
            f"Posted by u/{submission.author} on {datetime.fromtimestamp(submission.created_utc).strftime('%Y-%m-%d %H:%M:%S')}\n"
        )
        output.append(f"Score: {submission.score}\n")
        output.append(f"\n{submission.selftext}\n")
        output.append("\n## Comments:\n")

        # Replace "MoreComments" objects with actual comments
        submission.comments.replace_more(limit=None)

        def format_comment(comment, level=0):
            """Formats a comment with proper indentation and metadata"""
            indent = "  " * level
            timestamp = datetime.fromtimestamp(comment.created_utc).strftime(
                "%Y-%m-%d %H:%M:%S"
            )
            return f"{indent}- u/{comment.author} ({timestamp}, Score: {comment.score}):\n{indent}  {comment.body}\n"

        def process_comments(comments, level=0):
            """Recursively processes comments and their replies"""
            formatted_comments = []
            for comment in comments:
                formatted_comments.append(format_comment(comment, level))
                if len(comment.replies) > 0:
                    formatted_comments.extend(
                        process_comments(comment.replies, level + 1)
                    )
            return formatted_comments

        # Process all comments
        output.extend(process_comments(submission.comments))

        # Join all content and copy to clipboard
        final_output = "\n".join(output)
        pyperclip.copy(final_output)
        print("Post content has been copied to clipboard!")

    except Exception as e:
        print(f"Error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python reddit_scraper.py <reddit_post_url>")
        sys.exit(1)

    scrape_reddit_post(sys.argv[1])
