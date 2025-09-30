const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
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
            // Get cafe information
            const { data, error } = await supabase
                .from('cafe_info')
                .select(`
                    id,
                    name,
                    description,
                    instagram_url,
                    phone,
                    address,
                    logo_url,
                    background_image_url,
                    theme_color,
                    created_at,
                    updated_at
                `)
                .single();

            if (error) {
                throw error;
            }

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(data || {})
            };
        }

        if (event.httpMethod === 'POST' || event.httpMethod === 'PUT') {
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
            const { action, data: cafeData } = body;

            if (action === 'update') {
                // Update cafe information
                const { data: updatedCafe, error: updateError } = await supabase
                    .from('cafe_info')
                    .update(cafeData)
                    .eq('id', cafeData.id)
                    .select()
                    .single();

                if (updateError) throw updateError;

                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify(updatedCafe)
                };
            }

            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid action' })
            };
        }

        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };

    } catch (error) {
        console.error('Error in cafe-info API:', error);
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
