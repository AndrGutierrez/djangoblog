FROM python:3.9-slim
ENV DJANGOBLOG=/home/app/djangoblog
RUN mkdir -p $DJANGOBLOG
RUN mkdir -p $DJANGOBLOG/static

# where the code lives
WORKDIR $DJANGOBLOG

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
# install dependencies
RUN pip install --upgrade pip
# copy project
COPY . $MICRO_SERVICE
RUN pip install -r requirements.txt
CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "djangoblog.wsgi"]
