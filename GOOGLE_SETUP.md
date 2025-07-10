# Google Reviews Setup Guide - Simple Version

This guide will help you set up Google Places API to fetch real reviews for your Tintlabs website using a simple CORS proxy.

## Prerequisites

1. A Google Cloud Platform account
2. A business with a Google My Business listing

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

## Step 2: Enable Places API

1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for "Places API"
3. Click on "Places API" and click **Enable**

## Step 3: Create API Credentials

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > API Key**
3. Copy your API key
4. **(Optional)** Configure restrictions for security:
   - **Application restrictions**: Set to "HTTP referrers" and add your domain
   - **API restrictions**: Restrict to "Places API"

## Step 4: Find Your Place ID

You need to find your business's Google Place ID:

### Method 1: Using Place ID Finder Tool
1. Go to [Google Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id#find-id)
2. Search for your business name and location
3. Copy the Place ID

### Method 2: Using Google Maps
1. Go to [Google Maps](https://maps.google.com)
2. Search for your business
3. Click on your business listing
4. Copy the URL - the Place ID is in the URL after `!1s` parameter

## Step 5: Configure Environment Variables

1. Create a `.env` file in your project root:

```bash
VITE_GOOGLE_PLACES_API_KEY=your_api_key_here
VITE_GOOGLE_PLACE_ID=your_place_id_here
```

2. Add `.env` to your `.gitignore` file to keep your API keys secure

## Step 6: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Check the browser console for any errors
3. The testimonials section should now show your real Google reviews

## Troubleshooting

### Common Issues

1. **"API key not configured" warning**: Make sure your `.env` file is in the project root and the variables are correctly named.

2. **Quota exceeded**: Google Places API has usage limits. Check your quota in the Google Cloud Console.

3. **No reviews showing**: 
   - Verify your Place ID is correct
   - Check that your business has Google reviews
   - Ensure the Places API is enabled and your API key has proper permissions
   - If the CORS proxy (allorigins.win) is down, the app will automatically use fallback reviews

4. **CORS proxy unavailable**: If `allorigins.win` is down, you can replace it with alternatives like:
   - `https://cors-anywhere.herokuapp.com/`
   - `https://api.codetabs.com/v1/proxy?quest=`

### Security Best Practices

- Never commit your `.env` file to version control
- Consider using domain restrictions on your API key for production
- Monitor your API usage in Google Cloud Console

## Production Considerations

1. **Environment Variables**: Set environment variables in your hosting platform (Vercel, Netlify, etc.)
2. **Caching**: The implementation includes 1-hour caching to reduce API calls
3. **Fallback Data**: If the API or CORS proxy fails, the component shows curated fallback reviews
4. **CORS Proxy**: Uses `allorigins.win` - a free, reliable CORS proxy service

## Important: Google API Limitations

**Google Places API only returns 5 reviews maximum** - this is a Google limitation, not our code. The app automatically supplements Google reviews with curated fallback reviews to always show 6 total reviews.

**What happens:**
1. Fetches up to 5 real Google reviews
2. Supplements with curated reviews to reach 6 total
3. Avoids duplicating names between Google and fallback reviews

**Check browser console** to see exactly how many Google reviews were fetched vs. fallback reviews used.

## Cost Information

- Google Places API pricing: First 1,000 requests per month are free
- Each review fetch counts as one API request
- Reviews are cached for 1 hour to minimize API calls

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key permissions in Google Cloud Console
3. Ensure your business has a verified Google My Business listing with reviews 