import ast
from flask import Flask,request,jsonify
from flask_marshmallow import Marshmallow
import json
from database import db
from models import Student,Food
from schema import StudentSchema,FoodSchema
app=Flask(__name__)

ma = Marshmallow(app)
studentSche=StudentSchema()
foodSchema=FoodSchema()
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/add-food",methods=["POST"])
def add_food():
    req=request.get_json()
    print(req)
    food=Food(**req)
    db.session.add(food)
    db.session.commit()
    return "Success"
@app.route("/update-food",methods=["PUT"])
def update_food():
    req=request.get_json()
    print(req)
    food_item=db.session.execute(db.select(Food).filter_by(id=req['id'])).scalar_one()
    food_item.name=req['name']
    food_item.imageUrl=req['imageUrl']
    db.session.commit()
    return "Success"
@app.route("/delete-food/<int:food_id>",methods=["DELETE"])
def delete_food(food_id):
    food_item=db.session.execute(db.select(Food).filter_by(id=food_id)).scalar_one()
    db.session.delete(food_item)
    db.session.commit()
    return "Success"
@app.route("/food-items", methods=["GET"])
def get_food():
    # Query all food items from the database
    food_items = db.session.query(Food).all()
    
    # Serialize the food items using the FoodSchema
    serialized_food_items = foodSchema.dump(food_items, many=True)
    
    # Return the serialized food items as JSON
    return jsonify(serialized_food_items)

@app.route("/order",methods=["POST"])
def place_order():
    req=request.get_json()
    count=req['orders']
    print(str(count))
    data={'id':int(req['student_id']),'orders':str(count),'status':'Received'}
    print(data)
    stu=Student(**data)
    db.session.add(stu)
    db.session.commit()
    return 'worked'
@app.route("/past-orders",methods=["POST"])
def get_past_orders():
    req = request.get_json()
    student_id = req['student_id']
    # Fetch all orders for the student
    student_orders = db.session.execute(db.select(Student).filter_by(id=student_id)).all()

    final_data = []

    for order in student_orders:
        # Deserialize order data
        corrected_data = studentSche.dumps(order[0])
        order_data = json.loads(corrected_data)

        # Parse the orders string to a dictionary
        orders_dict = ast.literal_eval(order_data['orders'])  # {"1": 1, "2": 2}

        # Expand food details for each food item in the order
        expanded_items = []
        for food_id, quantity in orders_dict.items():
            food_item = db.session.execute(db.select(Food).filter_by(id=int(food_id))).scalar_one()
            food_item_data = foodSchema.dump(food_item)
            expanded_items.append({
                'id': food_item_data['id'],
                'name': food_item_data['name'],
                'imageUrl': food_item_data['imageUrl'],
                'quantity': quantity,
            })

        # Add order data with expanded food items
        final_data.append({
            'order_id': order_data['order_id'],
            'student_id': order_data['id'],
            'status': order_data['status'],
            'items': expanded_items,
        })

    return final_data
@app.route("/get-all-orders", methods=["GET"])
def get_all_orders():
    student_orders = db.session.query(Student).all()

    final_data = []

    for order in student_orders:
        # Deserialize order data
        print(order)
        corrected_data = studentSche.dumps(order)
        order_data = json.loads(corrected_data)
        # Parse the orders string to a dictionary
        orders_dict = ast.literal_eval(order_data['orders'])  # {"1": 1, "2": 2}

        # Expand food details for each food item in the order
        expanded_items = []
        for food_id, quantity in orders_dict.items():
            food_item = db.session.execute(db.select(Food).filter_by(id=int(food_id))).scalar_one()
            food_item_data = foodSchema.dump(food_item)
            expanded_items.append({
                'id': food_item_data['id'],
                'name': food_item_data['name'],
                'imageUrl': food_item_data['imageUrl'],
                'quantity': quantity,
            })

        # Add order data with expanded food items
        final_data.append({
            'order_id': order_data['order_id'],
            'student_id': order_data['id'],
            'status': order_data['status'],
            'items': expanded_items,
        })

    return final_data

@app.route("/update-status", methods=["POST"])
def update_status():
    req = request.get_json()
    print(req)

    # Retrieve food item by ID
    order_iden = req.get("order_id")
    new_status = req.get("status")
    student_order = db.session.execute(db.select(Student).filter_by(order_id=order_iden)).scalar_one_or_none()
    if not student_order:
        return jsonify({"error": "Order not found"}), 404

    # Update status
    student_order.status = new_status
    db.session.commit()
    return jsonify({"message": "Status updated successfully"})
if "__main__"==__name__: 
    app.run(host="0.0.0.0",debug=True)