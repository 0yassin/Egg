from fastapi import FastAPI


def create_app():
    app = FastAPI()
    
    @app.get("/")
    def home():
        return ("humm knock knockkk")
    return app


app = create_app()
