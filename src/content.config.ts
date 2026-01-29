import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

const socialSchema = z.object({
	url: z.string().url(),
	icon: z.string(),
	alt: z.string()
})

const linkSchema = z.object({
	url: z.string().url(),
	icon: z.string(),
	title: z.string(),
	description: z.string()
})

const user = defineCollection({
	loader: file('src/data/user.json', {
		parser: (text) => {
			const data = JSON.parse(text)
			return [{ id: 'profile', ...data }]
		}
	}),
	schema: z.object({
		name: z.string(),
		profession: z.string(),
		socials: z.array(socialSchema),
		links: z.array(linkSchema)
	})
})

export const collections = { user }
