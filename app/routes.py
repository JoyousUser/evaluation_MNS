from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session, current_app
from .models import db, Cocktail
from .ai import generate_cocktail
from datetime import datetime, timedelta
from functools import wraps


main = Blueprint('main', __name__)


@main.route('/api/generate', methods=['POST'])
def api_generate():
    """API endpoint for generating cocktails via JSON"""
    try:
        data = request.get_json()

        if not data or 'user_input' not in data:
            return jsonify({'error': 'Missing user_input in request body'}), 400

        user_input = data['user_input'].strip()
        if not user_input:
            return jsonify({'error': 'user_input cannot be empty'}), 400

        # Generate cocktail with AI
        cocktail_data = generate_cocktail(user_input)

        # Save to database
        new_cocktail = Cocktail(
            name=cocktail_data['name'],
            ingredients=cocktail_data['ingredients'],
            description=cocktail_data['description'],
            music_ambiance=cocktail_data['music_ambiance'],
            image_prompt=cocktail_data['image_prompt'],
            user_input=user_input
        )

        db.session.add(new_cocktail)
        db.session.commit()

        # Return JSON response with all data
        return jsonify({
            'id': new_cocktail.id,
            'name': cocktail_data['name'],
            'ingredients': cocktail_data['ingredients'],
            'description': cocktail_data['description'],
            'music_ambiance': cocktail_data['music_ambiance'],
            'image_prompt': cocktail_data['image_prompt'],
            'user_input': user_input,
            'created_at': new_cocktail.created_at.isoformat() if hasattr(new_cocktail, 'created_at') else None
        })

    except Exception as e:
        print(f"Error in API generate route: {e}")
        return jsonify({'error': 'Internal server error'}), 500


# Additional API routes
@main.route('/api/cocktails', methods=['GET'])
def api_list_cocktails():
    """Get list of all cocktails"""
    try:
        cocktails = Cocktail.query.order_by(Cocktail.id.desc()).limit(50).all()
        return jsonify([{
            'id': c.id,
            'name': c.name,
            'user_input': c.user_input,
            'created_at': c.created_at.isoformat() if hasattr(c, 'created_at') else None
        } for c in cocktails])
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve cocktails'}), 500


@main.route('/api/cocktails/<int:cocktail_id>', methods=['GET'])
def api_get_cocktail(cocktail_id):
    """Get specific cocktail by ID"""
    try:
        cocktail = Cocktail.query.get_or_404(cocktail_id)
        return jsonify({
            'id': cocktail.id,
            'name': cocktail.name,
            'ingredients': cocktail.ingredients,
            'description': cocktail.description,
            'music_ambiance': cocktail.music_ambiance,
            'image_prompt': cocktail.image_prompt,
            'user_input': cocktail.user_input,
            'created_at': cocktail.created_at.isoformat() if hasattr(cocktail, 'created_at') else None
        })
    except Exception as e:
        return jsonify({'error': 'Cocktail not found'}), 404

@main.route('/api/history')
def api_history():
    """API endpoint for cocktail history"""
    if not session.get('is_admin'):
        return jsonify({'success': False, 'error': 'Admin access required'}), 403
        
    cocktails = Cocktail.query.order_by(Cocktail.created_at.desc()).all()
    return jsonify({
        'success': True,
        'cocktails': [c.to_dict() for c in cocktails]
    })

@main.route('/api/login', methods=['POST'])
def api_login():
    """Extremely basic Manager API login endpoint for React frontend"""
    data = request.get_json()
    if not data or 'password' not in data:
        return jsonify({'error': 'password is required'}), 400

    if data['password'] == current_app.config['ADMIN_PASSWORD']:
        session['is_admin'] = True
        return jsonify({'success': True, 'message': 'Login successful'})
    return jsonify({'error': 'Invalid password'}), 401


@main.route('/api/check-auth')
def check_auth():
    """Check if user is authenticated"""
    return jsonify({'is_admin': session.get('is_admin', False)})

@main.route('/api/logout', methods=['POST'])
def logout():
    """Logout endpoint"""
    session.pop('is_admin', None)
    return jsonify({'success': True, 'message': 'Logged out'})