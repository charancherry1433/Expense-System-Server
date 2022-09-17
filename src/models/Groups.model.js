const { Model } = require('objection');

class Groups extends Model {
    static get tableName() {
        return 'groups';
    }

    static get idColumn() {
        return 'group_id ';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                group_id : { type: ['integer', null] },
                profile_img: { type: ['string', null] },
                group_name: { type: ['string', null] },
                user_id: { type: ['integer', 'number', null] },
                status: { type: ['integer', 'number', null] },
                created_at: { type: 'datetime' },
                updated_at: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Groups;