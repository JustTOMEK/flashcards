FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install --upgrade pip
RUN pip install libretranslate==1.6.2 torch==2.0.1

EXPOSE 5000
CMD ["libretranslate", "--host", "0.0.0.0", "--port", "5000", "--load-only", "en,pl,de"]
