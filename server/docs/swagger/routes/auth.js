module.exports = {
  '/app-auth/sign-in': {
    post: {
      tags: ['Auth'],
      summary: 'User Sign-in Method',
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
              required: ['email', 'password'],
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Login Your Account',
        },
      },
    },
  },

}
