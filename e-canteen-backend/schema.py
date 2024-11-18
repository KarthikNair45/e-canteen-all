from marshmallow import Schema, fields, validate

class StudentSchema(Schema):
    order_id = fields.Number()
    id = fields.Number()
    orders = fields.String()
    status = fields.String()
class FoodSchema(Schema):
    id = fields.Number()
    name = fields.String()
    imageUrl = fields.String()