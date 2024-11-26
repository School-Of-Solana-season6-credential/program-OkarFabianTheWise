use crate::state::BaseAccount;
use crate::state::*;
use anchor_lang::prelude::*;

pub fn save_trade(ctx: Context<SaveTrade>, item: String, price: String, time: i64) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    let trade = Trade { item, price, time };
    base_account.trades.push(trade);
    Ok(())
}

#[derive(Accounts)]
pub struct SaveTrade<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}