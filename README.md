# QUOTO-API

A API with

- 72,000+ quotes
- 10,000+ authors
- 100+ genres

## Built with

- Exress
- Prisma
- Postgres (from the wonderful folks at [Neon.tech](https://neon.tech) )

## API End points & response

Base URL: https://api-quoto.onrender.com/v1

Available end-points

- `/genre?limit=3&offset=0`
- `/author?limit=3&offset=0`
- `/quote?limit=5&offset=0`
- `/quote/random`

`/genre?limit=3&offset=0`

- limit: needs to be between 0 & 100 (both included)
- offset: needs to be greater than 0

```json
{
	"pagination": {
		"total": 105,
		"limit": 3,
		"offset": 0
	},
	"data": {
		"genres": [
			{
				"name": "age"
			},
			{
				"name": "alone"
			},
			{
				"name": "amazing"
			}
		]
	}
}
```

`/author?limit=3&offset=0`

- limit: needs to be between 0 & 100 (both included)
- offset: needs to be greater than 0

```json
{
	"pagination": {
		"total": 11061,
		"limit": 3,
		"offset": 0
	},
	"data": {
		"authors": [
			{
				"name": "Bill Cosby"
			},
			{
				"name": "Samuel Ullman"
			},
			{
				"name": "Sophia Loren"
			}
		]
	}
}
```

`/quote?limit=5&offset=0`

- limit: needs to be between 0 & 10 (both included)
- offset: needs to be greater than 0

```json
{
	"pagination": {
		"total": 72189,
		"limit": 10,
		"offset": 0
	},
	"data": {
		"quotes": [
			{
				"text": "Like everyone else who makes the mistake of getting older, I begin each day with coffee and obituaries.",
				"author": "Bill Cosby",
				"genre": "age"
			},
			{
				"text": "Nobody grows old merely by living a number of years. We grow old by deserting our ideals. Years may wrinkle the skin, but to give up enthusiasm wrinkles the soul.",
				"author": "Samuel Ullman",
				"genre": "age"
			},
			{
				"text": "There is a fountain of youth: it is your mind, your talents, the creativity you bring to your life and the lives of people you love. When you learn to tap this source, you will truly have defeated age.",
				"author": "Sophia Loren",
				"genre": "age"
			}
		]
	}
}
```

`/quote/random`

```json
{
	"text": "I'm a summer baby, so I usually have my birthday as a good summer memory.",
	"author": "Sloane Crosley",
	"genre": "birthday"
}
```

## Acknowlegements

This API is build from the data provided [prathamesh](https://pprathameshmore.github.io/QuoteGarden), so thanks ❤️

### Setup the project locally

```bash
# Clone this repository
$ git clone https://github.com/Deekshithrathod/api-quoto.git

# Install dependencies
$ npm install

# Start dev server
$ nodemon src/index.ts
```

## Contact

- GitHub [@Deekshithrathod](https://github.com/Deekshithrathod)
- Twitter [@Deekshithrathod](https://twitter.com/Deekshithrathod)
- Threads [@DeekshithRathod](https://www.threads.net/@deekshithrathod)
