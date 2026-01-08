-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    subscriber_id TEXT UNIQUE,
    mobile TEXT NOT NULL,
    email TEXT,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    pincode TEXT NOT NULL,
    number_of_copies INTEGER DEFAULT 1,
    subscription_start_date DATE NOT NULL,
    subscription_end_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'inactive')) DEFAULT 'active',
    bulk BOOLEAN DEFAULT FALSE,
    samiti TEXT,
    delivery_method TEXT NOT NULL CHECK (delivery_method IN ('registered', 'unregistered')),
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- Create subscription_history table
CREATE TABLE IF NOT EXISTS subscription_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscriber_id UUID NOT NULL REFERENCES subscribers(id) ON DELETE CASCADE,
    renewal_date DATE NOT NULL,
    previous_end_date DATE NOT NULL,
    new_end_date DATE NOT NULL,
    amount_paid NUMERIC(10, 2),
    payment_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscriber_id ON subscribers(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_mobile ON subscribers(mobile);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscription_end_date ON subscribers(subscription_end_date);
CREATE INDEX IF NOT EXISTS idx_subscription_history_subscriber_id ON subscription_history(subscriber_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_subscribers_updated_at BEFORE UPDATE ON subscribers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for subscribers table
-- Policy: Users can view all subscribers (authenticated users only)
CREATE POLICY "Users can view subscribers"
    ON subscribers FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Users can insert subscribers (authenticated users only)
CREATE POLICY "Users can insert subscribers"
    ON subscribers FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can update subscribers (authenticated users only)
CREATE POLICY "Users can update subscribers"
    ON subscribers FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can delete subscribers (authenticated users only)
CREATE POLICY "Users can delete subscribers"
    ON subscribers FOR DELETE
    USING (auth.role() = 'authenticated');

-- Create RLS policies for subscription_history table
-- Policy: Users can view subscription history (authenticated users only)
CREATE POLICY "Users can view subscription_history"
    ON subscription_history FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Users can insert subscription history (authenticated users only)
CREATE POLICY "Users can insert subscription_history"
    ON subscription_history FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can update subscription history (authenticated users only)
CREATE POLICY "Users can update subscription_history"
    ON subscription_history FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Policy: Users can delete subscription history (authenticated users only)
CREATE POLICY "Users can delete subscription_history"
    ON subscription_history FOR DELETE
    USING (auth.role() = 'authenticated');

