use anchor_lang::prelude::*;
pub mod errors;
pub mod instructions;
pub mod state;

use instructions::*;
declare_id!("7fCTzxzei5se329Gtbhr7cu2C8Qmx1gK7NVFagFKXuBd");

#[program]
pub mod bookeeper {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        instructions::initialize::initialize(ctx)
    }

    pub fn save_trade(
        ctx: Context<SaveTrade>,
        item: String,
        price: String,
        time: i64,
    ) -> Result<()> {
        instructions::save_trade::save_trade(ctx, item, price, time)
    }

    pub fn get_trades(ctx: Context<GetTrades>) -> Result<Vec<state::trade::Trade>> {
        instructions::get_trades::get_trades(ctx)
    }
}
