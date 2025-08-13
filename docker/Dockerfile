FROM python:3.10

WORKDIR /app
COPY . .

RUN pip install --upgrade pip
RUN pip install libretranslate==1.6.2 torch==2.5.0

EXPOSE 5000
CMD ["libretranslate", "--load-only", "en,pl,de"]
