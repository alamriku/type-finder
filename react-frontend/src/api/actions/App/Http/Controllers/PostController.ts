import { queryParams, type QueryParams } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
export const show = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ['get','head'],
    url: '/posts/{post}',
}

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
show.url = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { post: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { post: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            post: args[0],
        }
    }

    const parsedArgs = {
        post: typeof args.post === 'object'
        ? args.post.id
        : args.post,
    }

    return show.definition.url
            .replace('{post}', parsedArgs.post.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
show.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'get',
} => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
show.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'head',
} => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
const showForm = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    action: string,
    method: 'get',
} => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
showForm.get = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    action: string,
    method: 'get',
} => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\PostController::show
* @see app/Http/Controllers/PostController.php:10
* @route '/posts/{post}'
*/
showForm.head = (args: { post: number | { id: number } } | [post: number | { id: number } ] | number | { id: number }, options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    action: string,
    method: 'get',
} => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\PostController::store
* @see app/Http/Controllers/PostController.php:15
* @route '/posts'
*/
export const store = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ['post'],
    url: '/posts',
}

/**
* @see \App\Http\Controllers\PostController::store
* @see app/Http/Controllers/PostController.php:15
* @route '/posts'
*/
store.url = (options?: { query?: QueryParams, mergeQuery?: QueryParams }) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PostController::store
* @see app/Http/Controllers/PostController.php:15
* @route '/posts'
*/
store.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    url: string,
    method: 'post',
} => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PostController::store
* @see app/Http/Controllers/PostController.php:15
* @route '/posts'
*/
const storeForm = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    action: string,
    method: 'post',
} => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PostController::store
* @see app/Http/Controllers/PostController.php:15
* @route '/posts'
*/
storeForm.post = (options?: { query?: QueryParams, mergeQuery?: QueryParams }): {
    action: string,
    method: 'post',
} => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const PostController = { show, store }

export default PostController