import os
from supabase import create_client, Client
from dotenv import load_dotenv
from typing import Optional
from sys import gettrace
# ruff : noqa: E501

debug_mode = False
def debug_print(var):
    if gettrace() is not None or debug_mode is True:      # gettrace returns a trace func when debugging in vsc. debug_pring will only run on debugging
        print(var)
"""
load_dotenv()
# Using Environ Var
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")

supabase: Client = create_client(url, key)


# response = supabase.table('UserKarma').select("userID").execute()
# print(response)

user_id_input = int(input("Enter a user ID: "))
toxicity_input = int(input("Enter a toxicity score: "))
username_input = input("Enter a username: ")

user_id_input = 3
toxicity_input = 34
username_input = "shaurya"

result, error = (
    supabase.table("UserKarma")
    .upsert([{"userID": user_id_input, "TOXICITY": toxicity_input, "username": username_input}], on_conflict="userID")
    .execute()
)

if error != ('count', None):
    print(error)
else:
    print(f"Data upserted successfully: {result}")
print(result)
"""

class SupabaseDatabase:
    """
    A class for interacting with the Supabase database to manage user karma data.

    ### Attributes:
        supabase (Client): The Supabase client instance.

    ### Methods:
        `__init__(self, url: str, key: str):` \n
            Initializes the SupabaseDatabase object with the Supabase URL and API key.

        `upsert_user_karma(self, user_id: int, username: str, increment_list: list = []):` \n
            Upserts user karma data into the "UserKarma" table.

    ### Usage:
        Initialize the SupabaseDatabase object
        `url = os.environ.get("SUPABASE_URL")` <-- Optional \n
        `key = os.environ.get("SUPABASE_KEY")` <-- Optional \n
        `db = SupabaseDatabase(url, key)`

        Upsert user karma data \n
        `db.upsert_user_karma(3, "shaurya", ['TOXICITY','SEVERE_TOXICITY','THREAT','INSULT'])`
    """

    def __init__(self, url: Optional[str] = None, key: Optional[str] = None, table: Optional[str] = "UserKarma"):
        """
        Initializes the SupabaseDatabase object with the Supabase URL and API key.

        Args:
            url (str): The Supabase URL.
            key (str): The Supabase API key.
        """
        load_dotenv()
        url = os.environ.get("SUPABASE_URL") if url is None else url
        key = os.environ.get("SUPABASE_KEY") if key is None else key
        self.supabase: Client = create_client(url, key)

    def upsert_user_karma(self, user_id: int, username: str, increment_list: list = []):
        """
        Upserts user karma data into the "UserKarma" table.

        Args:
            user_id (int): The user's ID.
            username (str): The username.
            increment_list (list): List representing attributes like ['TOXICITY', 'SEVERE_TOXICITY', 'THREAT', 'INSULT'].

        Returns:
            None
        """
        data_to_upsert = {"userID": user_id}
        attributes = ['TOXICITY','SEVERE_TOXICITY','INSULT','THREAT']
        
        try:
            existing_user_data = self.supabase.table("UserKarma").select("*", count="exact").eq("userID", user_id).execute()
            if existing_user_data.data == []:
                raise IndexError # no user data found
            
            debug_print(existing_user_data.data)
            # If Username is chaanged
            if existing_user_data.data[0]['username'] != username:
                debug_print("Username not same anymore")
                data_to_upsert['username'] = username
                
        except IndexError:      # list of user data is empty (aka no user data found)
            print("User not found")
            data_to_upsert['username'] = username
            existing_user_data.data = [{'TOXICITY': 0, 'SEVERE_TOXICITY': 0, 'INSULT': 0, 'THREAT': 0}]
        except Exception as e:
            print(f"Error fetching user data: {e}")
            return

        # If any attributes sent in the list. increment it by 1 with already existing user data
        for attr_name in attributes:        # attributes = ['TOXICITY','SEVERE_TOXICITY','THREAT','INSULT']
            if attr_name in increment_list:
                data_to_upsert[attr_name] = existing_user_data.data[0][attr_name]+1
                debug_print(f"Increamented {attr_name} to {data_to_upsert[attr_name]}")
                
        print(f"Upserting: {data_to_upsert}")

        try:
            result, count = (
                self.supabase.table("UserKarma")
                .upsert([data_to_upsert], on_conflict="userID", count="exact")
                .execute()
            )
            debug_print(f"Data upserted successfully: {result}")
        except Exception as e:
            print(f"Error upserting data: {e}")
            return

        if count != ('count', 0):
            pass
            # print(f"Data upserted successfully: {result}")
        else:
            debug_print("error upserting data, count 0")
        return
    
    def get_karma(self, user_id: int):
        """Get Saved Karma data of a user

        Args:
            user_id (int): User id of the discord user

        Returns:
            (dict): format: {'userID': 669922090841014282, 'username': None, 'TOXICITY': 0, 'SEVERE_TOXICITY': 0, 'THREAT': 0, 'INSULT': 0}
        """
        try:
            debug_print(user_id)
            result = self.supabase.table("UserKarma").select("*", count="exact").eq("userID", user_id).execute()
            debug_print(result.data)
            #Sample Dict incase empty
            empty_dict = {'userID': user_id, 'username': "Error, couldn't find user", 'TOXICITY': "error", 'SEVERE_TOXICITY': "error", 'INSULT': "error", 'THREAT': "error"}
            if result.data == []:
                return empty_dict
            return result.data[0]
        except Exception as e:
            print(f"Error fetching user data: {e}")
            print("or wrong user id")
            return empty_dict


if __name__ == "__main__":
    sup = SupabaseDatabase()
    sup.upsert_user_karma(1,"shr", ['TOXICITY'])