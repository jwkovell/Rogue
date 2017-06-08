// Cost = total rank value for cards played * weight
// Benefit = net point gain * weight
// Harm = net point loss for another player * weight
// Score = strategic value of the move based upon:
// - Opportunity cost (based on cards remaining to be claimed and rank of card )
// - Smart pile on (getting rid of low-value cards)
// - Full court bonus
// - targeted opponent is in the lead bonus

// Reject outright:
// - pile ons with a court card that doesn't result in a full court
// - pile ons that don't refill player's hand

