FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN apt-get update -y && apt-get install -y libvips
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 3002

CMD [ "gunicorn", "-w", "1", "-b", "0.0.0.0:3002", "wsgi:app"]