const pricingData = {
    pricing: {
        subtotal: 102.96,
        savings: 3.85,
        discount: 0.0,
        tax: 8.92,
        total: 108.03,
        zip: 85050
    },
    itemDetails: {
        item_name: "Essentials by OFM ESS-3085 Racing Style Leather Gaming Chair, Red",
        quantity: 1,
        image: "https://i5.walmartimages.com/asr/e73e1252-642c-4473-93ea-fd3b564a7027_1.3e81ea58fa3042452fe185129a4a865f.jpeg?odnHeight=100&odnWidth=100&odnBg=FFFFFF",
        price: 99.11,
        originalPrice: 102.96
    }
};

export const getPricingData = (promoCode) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Make new object so the original number remain
            const pricing = JSON.parse(JSON.stringify(pricingData));
            
            // This is a mock API result to show the promoCode being applied
            if (promoCode.toUpperCase() == 'DISCOUNT') {
                pricing.pricing.discount = (pricing.pricing.total * 0.1);
                pricing.pricing.total = (pricing.pricing.total * 0.9);
            }
            resolve(pricing);
        }, 1000);
    });
};
