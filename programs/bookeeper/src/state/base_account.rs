use crate::state::trade::*;
use anchor_lang::prelude::*;

#[account]
pub struct BaseAccount {
    pub trades: Vec<Trade>,
}
