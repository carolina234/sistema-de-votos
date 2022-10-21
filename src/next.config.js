module.exports = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true'},
                    {key: 'Access-Control-Allow_Origin', value: '*'},
                    {key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'},
                    {ket: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-with, Accept, Accept-Version, Content-length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'}
                ]
            }
        ]
    }
}