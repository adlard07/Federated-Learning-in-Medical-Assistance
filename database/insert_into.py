from dataclasses import dataclass 
from database.connect_db import ConnectDB

@dataclass
class PushData:
    def __init__(self):
        self.mydb = ConnectDB()
        self.connection = self.mydb.connect_database()
        self.cursor = self.connection.cursor()
        self.query = "USE federatedsystem;"
        if self.connection.is_connected():
            self.db_Info = self.connection.get_server_info()
            self.cursor.execute(self.query)         
            self.connection.commit()


    def fetch_table(self):
        try:
            query = f"SELECT * FROM users;"
            self.cursor.execute(query)
            table = self.cursor.fetchall()
            # self.connection.close()
            return table
        except Exception as e:
            print(e)


    def create_table(self):
        try:
            query = f'''CREATE TABLE users(user_id int primary key auto_increment, email varchar(40), password varchar(20));'''
            self.cursor.execute(query)            
            self.connection.commit()
            # self.connection.close()
            print("Table created!")
        except Exception as e:
            print(e)


    def insert_values(self, values):
        try:
            self.cursor.execute(f"SELECT * FROM users")
            table = self.cursor.fetchall()
            self.connection.commit()

            if list(values)[0] not in [list(user)[1] for user in table]:
                query = f"INSERT INTO users(email, password) VALUES {values};"
                self.cursor.execute(query)           
                self.connection.commit()
                # self.connection.close()
                return "User added!"
            else:
                return "User already exists!"

        except Exception as e:
            print(e)
            return "User was not added!"

if __name__=="__main__":
    db = PushData()
    table = db.create_table()
    message = db.insert_values(values=('example@gmail.com', 'Example@123'))
    print(message)
    table = db.fetch_table()
    print(table)