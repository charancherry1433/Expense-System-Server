const { Model } = require('objection');

class Expenses extends Model {
    static get tableName() {
        return 'expenses';
    }

    static get idColumn() {
        return 'exp_id ';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                exp_id : { type: 'integer' },
                exp_name: { type: 'string' },
                amount: { type: 'integer' },
                currency: { type: 'string' },
                description: { type: 'string' },
                paid_on: { type: 'datetime' },
                proof: { type: 'string' },
                rating_value: { type: 'integer' },
                rating_name: { type: 'string' },
                user_id: { type: 'integer' },
                group_id: { type: 'integer' },
                created_at: { type: 'datetime' },
                updated_at: { type: 'timestamp' }
            }
        }
    }
}

module.exports = Expenses;