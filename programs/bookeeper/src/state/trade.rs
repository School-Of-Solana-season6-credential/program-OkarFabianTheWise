use anchor_lang::prelude::*;

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct Trade {
    pub item: String,
    pub price: String,
    pub time: i64,
}
