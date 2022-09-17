const { Model } = require('objection');

class Users extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'user_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                user_id: { type: ['integer', null] },
                fullname: { type: ['string', null] },
                username: { type: ['string', null] },
                email: { type: ['string', null] },
                password: { type: ['string', null] },
                mobile: { type: ['string', null] },
                profile: { type: ['string', 'text', null] },
                role: { type: ['string', null] },
                status: { type: ['integer', 'number', null] },
                group_id: { type: ['integer', 'number', null] },
                created_at: { type: 'datetime' },
                updated_at: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Users;