const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        if (event.httpMethod === 'GET') {
            // Get all menu items
            const { data, error } = await supabase
                .from('menu_items')
                .select(`
                    id,
                    category_id,
                    name,
                    description,
                    price,
                    is_available,
                    created_at,
                    updated_at
                `)
                .eq('is_available', true)
                .order('created_at', { ascending: true });

            if (error) {
                throw error;
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data || [])
            };
        }

        if (event.httpMethod === 'POST') {
            // Verify authentication
            const token = event.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({ error: 'Unauthorized' })
                };
            }

            // Verify JWT token with Netlify Identity
            const { user } = await supabase.auth.getUser(token);
            if (!user) {
                return {
                    statusCode: 401,
                    headers,
                    body: JSON.stringify({ error: 'Invalid token' })
                };
            }

            const body = JSON.parse(event.body);
            const { action, data: itemData } = body;

            switch (action) {
                case 'create':
                    const { data: newItem, error: createError } = await supabase
                        .from('menu_items')
                        .insert([itemData])
                        .select()
                        .single();

                    if (createError) throw createError;

                    return {
                        statusCode: 201,
                        headers,
                        body: JSON.stringify(newItem)
                    };

                case 'update':
                    const { data: updatedItem, error: updateError } = await supabase
                        .from('menu_items')
                        .update(itemData)
                        .eq('id', itemData.id)
                        .select()
                        .single();

                    if (updateError) throw updateError;

                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(updatedItem)
                    };

                case 'delete':
                    const { error: deleteError } = await supabase
                        .from('menu_items')
                        .delete()
                        .eq('id', itemData.id);

                    if (deleteError) throw deleteError;

                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({ success: true })
                    };

                default:
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'Invalid action' })
                    };
            }
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error in menu API:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};
