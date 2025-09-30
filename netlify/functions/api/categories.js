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
            // Get all categories
            const { data, error } = await supabase
                .from('categories')
                .select(`
                    id,
                    name,
                    description,
                    icon,
                    order,
                    is_active,
                    created_at,
                    updated_at
                `)
                .eq('is_active', true)
                .order('order', { ascending: true });

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
            const { action, data: categoryData } = body;

            switch (action) {
                case 'create':
                    const { data: newCategory, error: createError } = await supabase
                        .from('categories')
                        .insert([categoryData])
                        .select()
                        .single();

                    if (createError) throw createError;

                    return {
                        statusCode: 201,
                        headers,
                        body: JSON.stringify(newCategory)
                    };

                case 'update':
                    const { data: updatedCategory, error: updateError } = await supabase
                        .from('categories')
                        .update(categoryData)
                        .eq('id', categoryData.id)
                        .select()
                        .single();

                    if (updateError) throw updateError;

                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify(updatedCategory)
                    };

                case 'delete':
                    const { error: deleteError } = await supabase
                        .from('categories')
                        .delete()
                        .eq('id', categoryData.id);

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
        console.error('Error in categories API:', error);
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
