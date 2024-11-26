use crate::errors::ErrorCode;
use crate::state::trade::*;
use crate::state::BaseAccount;
use anchor_lang::prelude::*;

pub fn get_trades(ctx: Context<GetTrades>) -> Result<Vec<Trade>> {
    let base_account = &ctx.accounts.base_account;
    if base_account.trades.is_empty() {
        return Err(ErrorCode::NoTrades.into());
    }
    Ok(base_account.trades.clone())
}

#[derive(Accounts)]
pub struct GetTrades<'info> {
    #[account(mut)]
    pub base_account: Account<'info, BaseAccount>,
}
